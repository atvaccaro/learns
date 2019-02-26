use std::io::{self, Read};

fn main() {
    let mut buffer = String::new();

    io::stdin().read_line(&mut buffer).unwrap();
    let numbers: Vec<i32> = buffer.as_str().split_whitespace().map(|s| s.parse::<i32>().unwrap()).collect();

    let mut min = i32::max_value();
    let mut max = i32::min_value();

    for n in numbers {
        if n < min {
            min = n;
        }

        if n > max {
            max = n;
        }
    }

    print!("{} {}", max, min);
}