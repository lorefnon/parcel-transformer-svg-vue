<template lang="html">
    <div>{{name}}</div>
    <Icon />
</template>

<script scoped lang="js">
import { ref } from "vue"
import Icon from "vue:./icon.svg"

const name = ref("Lorefnon")
</script>
