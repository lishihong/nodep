import Vue from 'vue'

function deal(el,isVisible) {
    if (isVisible.value) {
        el.style.visibility = "visible"
    } else {
        el.style.visibility = "hidden"
    }
}

const visible = Vue.directive('visible',{
    update:function(el,isVisible) {
        deal(el,isVisible)
    },
    inserted: function(el, isVisible) {
        deal(el, isVisible)
    }
})
export {visible}