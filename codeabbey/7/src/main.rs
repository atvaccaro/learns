use std::io::{self, Read};

fn main() {
    let mut buffer = String::new();

    io::stdin().read_line(&mut buffer).unwrap();

    let mut results = Vec::new();

    for n in buffer.split_whitespace().skip(1) {
        let f = n.parse::<f32>().unwrap();
        results.push(((f - 32.0) * (5.0 / 9.0)).round().to_string());
    }

    print!("{}", results.join(" "));
}