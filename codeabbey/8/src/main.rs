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
        let n = *numbers.get(2).unwrap();
        let mut sum = 0;

        for i in 0..n {
            sum += a + b * i;
        }

        results.push(sum.to_string());
    }

    println!("{}", results.join(" "));
}
