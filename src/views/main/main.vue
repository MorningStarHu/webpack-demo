<template>
    <div class="yellow" style="background:grey">
        {{$t('HELLO')}}
        <Button type="primary">测111试</Button>
        <Button type="primary">测11111111111试</Button>
        <Button type="primary">测111111试</Button>
         <Button type="primary">测2222222试</Button>
          <Button type="primary">测试</Button>
          <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>

    </div>
</template>

<script>
export default {
    data() {
        return {
            text: this.$store.state.text
        }
    }
}
</script>


<style >
    /* .yellow{
        height: 200px;
        width: 300px;
        background-color:white;
    } */
</style>
