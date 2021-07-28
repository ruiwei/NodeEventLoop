/*
    Function to Calculate Pi
    1 - 1 / 3 + 1 / 5 - 1 / 7 + 1 / 9 ... * 4
*/
function pi() {
    let mol = 1
    let t = 0
    let e = 10000000000
    for (let i = 0; i < e; i++) {
        t += mol / (2 * i + 1)
        mol = 0 - mol
    }
    return (t * 4).toPrecision(10)    
}

/*
    Event Loop Blocked
*/
export function blocked() {
    return pi()
}

/* 
    Event Loop Not Blocked
    By Partition 
    It is slow: every calculation add an Event to the Loop, can partition more but still slow.
*/
export function byPartition(callback: (result) => void) {
    let t = 0
    let mol = 1
    let e = 1000000000
    let i = 0
    function help(next: (d) => void) {
        t += mol / (2 * i + 1)
        mol = 0 - mol
        if (i == e) {
            return next(t)
        }
        setImmediate(help.bind(null, i + 1, next))
    }
    help((d) => {
        return callback((d * 4).toPrecision(10))
    })
}

/*
    Worker
    Offload
    Cons: 
*/
import * as workerpool from 'workerpool'
const pool = workerpool.pool()
export function byWorker(callback: (error, result) => void) {
    pool.exec(pi, null).then(d => {
        return callback(null, d)
    }).catch(err => {
        return callback(err, null)
    })
}