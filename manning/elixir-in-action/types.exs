# Atoms
variable = :this_is_an_atom
IO.puts(variable)
variable2 = AlsoAnAtom
IO.puts(variable2)

# Tuples
person = {"Bob", 25}
age = elem(person, 1)
IO.puts(age)
s = put_elem(person, 1, 26)
    |> Tuple.to_list
    |> Enum.join(",")
IO.puts(s)

# Lists
prime_numbers = [2, 3, 5, 7]
IO.puts(length(prime_numbers))
Enum.at(prime_numbers, 3)
5 in prime_numbers
List.replace_at(prime_numbers, 0, 11)
List.insert_at(prime_numbers, 3, 13)
[1, 2, 3] ++ [4, 5]
# head/tail stuff
[1 | []]
[1 | [2]]
hd(prime_numbers)
tl(prime_numbers)
a_list = [5, :value, true]
new_list = [:new, a_list]

# Maps
empty_map = %{}
squares = %{1 => 1, 2 => 4, 3 => 9}
squares = Map.new([{1, 1}, {2, 4}, {3, 9}])
squares[2]
squares[4]
Map.get(squares, 4, :not_found)
Map.fetch(squares, 2)
# Map.fetch!(squares, 4)
Map.put(squares, 4, 16)
bob = %{:name => "Bob", :age => 25, :works_at => "Initech"}
# equivalent to
bob = %{name: "Bob", age: 25, works_at: "Initech"}
bob[:non_existent_field]
bob.age
next_years_bob = %{bob | age: 26}
%{bob | age: 26, works_at: "Initrode"}

# Strings
"String" <> " " <> "concatenation"
~s("Do... or do not. There is no try." -Master Yoda)
'ABC' # char list

# First class functions
square = fn x ->
  x * x
end
square.(5)
print_element = fn x -> IO.puts(x) end
Enum.each(
  [1, 2, 3],
  print_element
)
Enum.each(
  [1, 2, 3],
  fn x -> IO.puts(x) end
)
Enum.each(
  [1, 2, 3],
  &IO.puts/1
)
lambda = fn x, y, z -> x * y + z end
lambda = &(&1 * &2 + &3)
# closures work

# other things
range = 1..2
days = [{:monday, 1}, {:tuesday, 2}, {:wednesday, 3}]
days = [monday: 1, tuesday: 2, wednesday: 3]
Keyword.get(days, :monday)
days[:tuesday]
IO.inspect([100, 200, 300])
IO.inspect([100, 200, 300], [width: 3])
IO.inspect([100, 200, 300], width: 3, limit: 1)
#def my_fun(arg1, arg2, opts \\ []) do
#  ...
#end
days = MapSet.new([:monday, :tuesday, :wednesday])
MapSet.member?(days, :monday)
MapSet.member?(days, :noday)
days = MapSet.put(days, :thursday)
Enum.each(days, &IO.puts/1)
date = ~D[2018-01-31]
date.year
time = ~T[11:59:12.00007]
time.hour
naive_datetime = ~N[2018-01-31 11:59:12.000007]
datetime = DateTime.from_naive!(naive_datetime, "Etc/UTC")
iolist = [[['H', 'e'], "llo,"], " worl", "d!"]

# Dynamically call function
apply(IO, :puts, ["Dynamic function call."])


