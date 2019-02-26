extern crate iron;
#[macro_use] extern crate mime; //use macros exported by this crate
extern crate router;
extern crate urlencoded;

use std::str::FromStr;
use iron::prelude::*; //prelude means the exports are generally used, so might as well *
use iron::status;
use router::Router;
use urlencoded::UrlEncodedBody;


fn main() {
    let mut router = Router::new();

    router.get("/", get_form);
    router.post("/gcd", post_gcd);

    println!("Serving on http://localhost:3000...");
    Iron::new(router).http("localhost:3000").unwrap();
}


#[allow(unused_variables)]
fn get_form(request: &mut Request) -> IronResult<Response> { //mutable Request reference
    let mut response = Response::new();

    response.set_mut(status::Ok);
    response.set_mut(mime!(Text/Html; Charset=Utf8));
    response.set_mut(r#"
        <title>GCD Calculator</title>
        <form action="/gcd" method="post">
            <input type="text" name="n"/>
            <input type="text" name="n"/>
            <button type="submit">Compute GCD</button>
        </form>
    "#);
    Ok(response)
}


fn post_gcd(request: &mut Request) -> IronResult<Response> {
    let mut response = Response::new();

    let hashmap;
    match request.get_ref::<UrlEncodedBody>() {
        Err(e) => {
            response.set_mut(status::BadRequest);
            response.set_mut(format!("Error parsing data form: {:?}\n", e));
            return Ok(response);
        }

        Ok(map) => {
            hashmap = map;
        }
    }

    let unparsed_numbers;
    match hashmap.get("n") {
        None => {
            response.set_mut(status::BadRequest);
            response.set_mut(format!("Form data has no 'n' parameter\n"));
            return Ok(response);
        }

        Some(nums) => {
            unparsed_numbers = nums;
        }
    }

    let mut numbers = Vec::new();
    for unparsed in unparsed_numbers {
        match u64::from_str(&unparsed) {
            Err(_) => {
                response.set_mut(status::BadRequest);
                response.set_mut(format!("Value for 'n' parameter not a number: {:?}\n", unparsed));
                return Ok(response);
            }
            Ok(n) => {
                numbers.push(n);
            }
        }
    }

    let mut d = numbers[0];
    for m in &numbers[1..] {
        d = gcd(d, *m);
    }

    response.set_mut(status::Ok);
    response.set_mut(format!("The greatest common divisor of these numbers {:?} is <b>{}</b>\n", numbers, d));
    Ok(response)
}

fn gcd(mut n: u64, mut m: u64) -> u64 {
    assert!(n != 0 && m != 0);
    while m != 0 {
        if m < n {
            let t = m; m = n; n = t;
        }
        m = m % n;
    }
    n
}
