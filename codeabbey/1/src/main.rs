
use std::io::{self, Read};

fn main() {
    let mut buffer = String::new();

    io::stdin().read_line(&mut buffer).unwrap();
    let a = buffer.trim().parse::<i32>().unwrap();

    buffer.clear();
    io::stdin().read_line(&mut buffer).unwrap();
    let b = buffer.trim().parse::<i32>().unwrap();

    println!("{}", a + b);
}
