// Day 5

extern crate crypto;

use crypto::digest::Digest;
use crypto::md5::Md5;

fn main() {
    let input = "cxdnnyjw";
    let mut digest = Md5::new();

    // Part 1
    let mut index = 0;
    let mut password = String::new();

    for _i in 0..input.len() {
        loop {
            digest.reset();
            let s = format!("{}{}", input, index);
            digest.input_str(&s);
            let hash = digest.result_str();


            index += 1;

            if hash.starts_with("00000") {
                password.push(hash.chars().nth(5).unwrap());
                break;
            }
        }

    }

    println!("Part 1: {}", password);

    // Part 2
    let mut index = 0;
    let mut password = String::from("gggggggg");

    for _i in 0..input.len() {
        loop {
            digest.reset();
            let s = format!("{}{}", input, index);
            digest.input_str(&s);
            let hash = digest.result_str();

            index += 1;

            let sixth = match hash.chars().nth(5).unwrap().to_digit(10) {
                Some(x) => x as usize,
                None => continue,
            };


            if hash.starts_with("00000")
                && sixth < 8
                && password.chars().nth(sixth).unwrap() == 'g' {
                println!("{}", sixth);
                println!("{}", hash.chars().nth(6).unwrap());
                password.remove(sixth);
                password.insert(sixth, hash.chars().nth(6).unwrap());
                println!("{}", password);
                break;
            }
        }
    }

    println!("Part 2: {}", password);
}