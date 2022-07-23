function includeNavbar () {

    let z = document.getElementsByTagName("*");

    for (let i=0; i<z.length; i++) {
        let element = z[i];
        let file = element.getAttribute("inix-include-nav");

        if (file) {
            let XHttp = new XMLHttpRequest();

            XHttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) element.innerHTML = this.responseText;
                    if (this.status === 404) element.innerHTML = "Error 404: Page Not Found";
                    element.removeAttribute("inix-include-nav");
                    includeNavbar();
                }
            }

            XHttp.open("GET", file, true);
            XHttp.send();
            return;
        }
    }
}