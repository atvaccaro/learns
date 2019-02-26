use std::io::{self, Read};

fn main() {
    let mut buffer = String::new();

    io::stdin().read_line(&mut buffer).unwrap();

    let rows = buffer.trim().parse::<i32>().unwrap();

    let mut results = Vec::new();

    for _ in 0..rows {
        buffer.clear();
        io::stdin().read_line(&mut buffer).unwrap();

        let numbers: Vec<i64> = buffer.as_str().split_whitespace().map(|s| s.parse::<i64>().unwrap()).collect();

        let a = *numbers.get(0).unwrap();
        let b = *numbers.get(1).unwrap();
        let c = *numbers.get(2).unwrap();

        if a + b >= c && a + c >= b && b + c >= a {
            results.push("1");
        } else {
            results.push("0");
        }
    }

    println!("{}", results.join(" "));
}
