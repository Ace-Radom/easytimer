(() => {
    "use strict";
    function createElement(tag, attrs = {}, children = []) {
        let elem = document.createElement(tag);
        Object.entries(attrs).forEach(([attr, val]) => elem.setAttribute(attr, val));
        elem.append(...children);
        return elem;
    }

    // Add toggles for the sidebar
    let header = document.getElementsByClassName("header")[0];
    header.prepend(...[
        createElement("input", {
            id: "openSidebarMenu",
            class: "openSidebarMenu",
            type: "checkbox",
        }),
        createElement("label", {
            class: "sidebarIconToggle",
            for: "openSidebarMenu",
        },[
            "spinner diagonal part-1",
            "spinner horizontal",
            "spinner diagonal part-2",
        ].map(c => {
            return createElement("div", {class: c});
        })),
    ]);
    header.insertAdjacentElement("afterend", createElement("div", {class: "phantom-header"}));

    // Append entries to the sidebar
    document.getElementById("sidebarMenu").append(createElement("ul", {
        class: "sidebarMenuInner",
    }, [
        ["Countdown Timer", "countdown_timer.html"],
        ["Stopwatch", "stopwatch.html"],
        ["Source code", "https://github.com/Ace-Radom/easytimer"],
    ].map(([name, ref]) => {
        return createElement("li", {}, [
            createElement("a", {href: ref}, [name]),
        ]);
    })));
})();
