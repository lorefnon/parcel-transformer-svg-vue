<template lang="html">
    <div>{{name}}</div>
    <Icon />
</template>

<script setup lang="js">
import { ref } from "vue"
import Icon from "vue:./icon.svg"

const name = ref("Lorefnon")
</script>
