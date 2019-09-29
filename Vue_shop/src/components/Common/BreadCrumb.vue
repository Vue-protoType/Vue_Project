<template>
      <div class="breadcrumb-content">
        <div class="container">
          <div aria-label="breadcrumb">
            <ol class="breadcrumb">
              <slot name="previous"></slot>
              <slot name="next"></slot>
            </ol>
          </div>
        </div>
      </div>
</template>

<script>
    export default {
        name: "BreadCrumb"
    }
</script>

<style lang="scss" scoped>

</style>
