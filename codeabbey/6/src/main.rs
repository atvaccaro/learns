use std::io::{self, Read};

fn main() {
    let mut buffer = String::new();

    io::stdin().read_line(&mut buffer).unwrap();
    let rows = buffer.trim().parse::<i32>().unwrap();

    let mut results = Vec::new();

    for _ in 0..rows {
        buffer.clear();
        io::stdin().read_line(&mut buffer).unwrap();

        let numbers: Vec<f64> = buffer.as_str().split_whitespace().map(|s| s.parse::<f64>().unwrap()).collect();

        println!("Dividing {} by {}", numbers.get(0).unwrap(), numbers.get(1).unwrap());
        results.push((numbers.get(0).unwrap() / numbers.get(1).unwrap()).round().to_string());
    }

    print!("{}", results.join(" "));
}