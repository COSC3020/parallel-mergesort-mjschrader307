function merge(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

const { StaticPool } = require("node-worker-threads-pool");

function mergesortPTP(arr, done) {
  if (arr.length <= 1) return arr;

  // Uses Thread Pool approach
  const threads = 4;

  const pool = new StaticPool({
    size: threads,
    task: function (portion) {
      function merge(arr1, arr2) {
        let result = [];
        let i = 0;
        let j = 0;

        while (i < arr1.length && j < arr2.length) {
          if (arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++;
          } else {
            result.push(arr2[j]);
            j++;
          }
        }

        while (i < arr1.length) {
          result.push(arr1[i]);
          i++;
        }

        while (j < arr2.length) {
          result.push(arr2[j]);
          j++;
        }

        return result;
      }

      function sort(arr) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = sort(arr.slice(0, mid));
        const right = sort(arr.slice(mid));

        return merge(left, right);
      }

      return sort(portion);
    },
  });

  const size = arr.length / threads;

  // Array for holding sorted portions
  const sortedPortions = new Array(threads);
  let finishedCount = 0;

  for (let i = 0; i < threads; i++) {
    const start = i * size;
    const end = (i + 1) * size < arr.length ? (i + 1) * size : arr.length;

    const portion = arr.slice(start, end);

    (async () => {
      // Sort the portion
      const sorted_portion = await pool.exec(portion);

      // Store it in sorted portions array
      sortedPortions[i] = sorted_portion;
      finishedCount++;

      if (finishedCount === threads) {
        // Merge all sorted portions (from left to right) only when all have been processed
        let sorted = sortedPortions[0] || [];

        for (let j = 1; j < sortedPortions.length; j++) {
          let next = sortedPortions[j];
          sorted = merge(sorted, next);
        }

        pool.destroy();
        done(sorted);
      }
    })();
  }
}

module.exports = { mergesortPTP };