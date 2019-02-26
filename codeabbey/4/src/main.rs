use std::io::{self, Read};

fn main() {
    let mut buffer = String::new();

    io::stdin().read_line(&mut buffer).unwrap();
    let rows = buffer.trim().parse::<i32>().unwrap();

    let mut results = Vec::new();

    for _ in 0..rows {
        buffer.clear();
        io::stdin().read_line(&mut buffer).unwrap();

        let numbers: Vec<i32> = buffer.as_str().split_whitespace().map(|s| s.parse::<i32>().unwrap()).collect();

        if numbers.get(0).unwrap() < numbers.get(1).unwrap() {
            results.push(numbers.get(0).unwrap().to_string());
        } else {
            results.push(numbers.get(1).unwrap().to_string());
        }
    }

    print!("{}", results.join(" "));
}


