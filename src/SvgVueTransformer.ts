import { Transformer } from "@parcel/plugin";
import debugF from "debug"
import { optimize } from "svgo";

const debug = debugF("lf-svg-tr");

export default new Transformer({
    async loadConfig({ config }) {
        const svgoResult = await config.getConfig([
            'svgo.config.js',
            'svgo.config.cjs',
            'svgo.config.mjs',
            'svgo.config.json',
        ]);
        return {
            svgo: svgoResult?.contents
        };
    },

    async transform({ asset, config }) {
        debug("Processing: %s", asset.filePath)
        const svgoConfig = config.svgo;
        let svg = await asset.getCode();
        debug("Original svg: %s", svg)
        if (svgoConfig !== false) {
            ({ data: svg } = optimize(svg, {
                path: asset.filePath,
                ...(svgoConfig as any)
            }));
            debug("Transformed svg: %s", svg)
        }
        // return [{
        //     type: "vue",
        //     uniqueKey: `${asset.id}-vue`,
        //     content: `<template lang="html">${svg}</template>`,
        //     bundleBehavior: "inline"
        // }]
        asset.type = "vue";
        asset.bundleBehavior = "inline";
        const tmplContent = svg.replace(/<\?xml.*\?>/, '').trim()
        asset.setCode(`<template>${tmplContent}</template>`);
        return [asset];
    },
})
