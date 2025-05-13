const { mergesortPTP } = require("./code.js");

function normalSort(arr) {
    return arr.sort((a, b) => { return a - b; });
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }

    return true;
}

function eval(arr) {
    let a1 = JSON.parse(JSON.stringify(arr));
    let a2 = JSON.parse(JSON.stringify(arr));

    const correct = normalSort(a2);

    mergesortPTP(a1, (result) => {
        if (!arraysEqual(result, correct)) {
            throw new Error("Mismatching sorted results");
        }
    });
}

function test() {
    const tests = [
        [0, 1, 0, 1, 0, 1],
        [],
        [0],
        [1, 3, 5, 7, 9, 2, 4, 6, 8, 10],
        [2, 1, 0, -1, -2]
    ];

    for (let i = 0; i < tests.length; i++) {
        const T = tests[i];

        eval(T);
    }
}

test();