const express = require('express');
const app = express();
const PORT = 3000;

function calculateFibonacci(n) {
    let sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence.slice(0, n);
}

function calculateSum(arr) {
    return arr.reduce((acc, val) => acc + val, 0);
}

app.get('/api/v1/test/:memberCount', (req, res) => {
    const memberCount = parseInt(req.params.memberCount, 10);

    if (isNaN(memberCount) || memberCount < 1 || memberCount > 100) {
        return res.status(400).json({
            error: 'Value is invalid. Enter numbers between 1 and 100 only.'
        });
    }

    const sequence = calculateFibonacci(memberCount);
    const total = calculateSum(sequence);

    res.json({
        "member-count": memberCount,
        "sequence": sequence,
        "total": total
    });
});

app.get('/', (req, res) => {
    res.send('endpoint: /api/v1/test/memberCount');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
