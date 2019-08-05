import Vue from 'vue'

const number = Vue.filter('number', function(val,count) {
    return val.toFixed(count)
})

export {number}