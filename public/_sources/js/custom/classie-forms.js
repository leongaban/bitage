! function() {
    function t(t) {
        classie.add(t.target.parentNode, "input--filled")
    }

    function e(t) {
        "" === t.target.value.trim() && classie.remove(t.target.parentNode, "input--filled")
    }
    String.prototype.trim || ! function() {
        var t = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
            return this.replace(t, "")
        }
    }(), [].slice.call(document.querySelectorAll("input.input__field")).forEach(function(i) {
        "" !== i.value.trim() && classie.add(i.parentNode, "input--filled"), i.addEventListener("focus", t), i.addEventListener("blur", e)
    })
}();