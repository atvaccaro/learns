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

        let x1 = *numbers.get(0).unwrap();
        let y1 = *numbers.get(1).unwrap();
        let x2 = *numbers.get(2).unwrap();
        let y2 = *numbers.get(3).unwrap();

        let a = (y2 - y1) / (x2 - x1);
        let b = y1 - a * x1;

        results.push(format!("({} {})", a, b));
    }

    println!("{}", results.join(" "));
}
