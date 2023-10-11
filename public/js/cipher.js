window.onload = function () {
    const links = document.querySelectorAll("a.cipher");
    const solveMilliseconds = 800;
    const characterSelectionMilliseconds = 40;
    const delayMilliseconds = 250;
    const characters = [..."ᚪᛒᚳᛞᛖᚠᚷᚻᛁᛄᚳᛚᛘᚾᚩᛈᚳᚱᛋᛏᚢᚠᚹᛋᛁᛋ"];

    const randomArrayElement = (arr) => {
        return arr[Math.floor(arr.length * Math.random())];
    };

    links.forEach((element) => {
        let isScrambled = false;
        let isActive = false;
        element.addEventListener("mouseenter", (e) => {
            if (!isActive) {
                const element = e.target;
                isActive = true;
                isScrambled = !isScrambled;
                scrambleText(element, isScrambled, () => {
                    isActive = false;
                });
                e.preventDefault();
            }
        });
    });

    function scrambleText(element, isScrambled, callback) {
        if (!element.classList.contains("active")) {
            let delay = 0;
            const originalText = element.getAttribute("data-original-text");
            const elementCharacters = [...originalText];
            const lockMilliseconds =
                delayMilliseconds * elementCharacters.length + solveMilliseconds;

            element.classList.add("active");

            setTimeout(() => {
                element.classList.remove("active");
                callback();
            }, lockMilliseconds);

            elementCharacters.forEach((character, index) => {
                setTimeout(
                    () => {
                        let intervalId = setInterval(() => {
                            const randomCharacter = randomArrayElement(characters);
                            element.innerText = replaceCharacter(
                                element.innerText,
                                index,
                                isScrambled ? randomCharacter : elementCharacters[index]
                            );

                            setTimeout(() => {
                                clearInterval(intervalId);
                                element.innerText = replaceCharacter(
                                    element.innerText,
                                    index,
                                    isScrambled ? elementCharacters[index] : randomCharacter
                                );
                            }, solveMilliseconds);
                        }, characterSelectionMilliseconds);
                    },
                    delay === 0 ? (delay += 1) : (delay += delayMilliseconds)
                );
            });
        }
    }

    function replaceCharacter(str, index, chr) {
        return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
    }
};
