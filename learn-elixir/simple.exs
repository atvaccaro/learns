# Printing stuff
IO.puts("Hello world from Elixir")

# Anonymous function; use period when calling
add = fn a, b -> a + b end
IO.puts(add.(1, 2))

# Closure
double = fn a -> add.(a, a) end
IO.puts(double.(2))

# Linked lists
a = [1, 2, 3]
b = [4, 5, 6]
IO.inspect(a ++ b)

IO.puts(hd(a))
IO.inspect(tl(a))

# Single quotes are charlists, double quotes are strings
IO.puts('hello' == "hello")

# Tuples
IO.inspect({:ok, "hello"})
IO.puts(elem({:ok, "hello"}, 1))

IO.inspect(put_elem({:a, :b, :c, :d}, 2, :e))

# Files
IO.inspect(File.read("test.txt"))
IO.inspect(File.read("nothing.nothing"))

# Operators
IO.puts("foo" <> "bar")
IO.puts(true and true)
IO.puts(false or is_atom(:example))
IO.puts(false and raise("This error will never be raised"))
IO.puts(1 || true)
IO.puts(false || 11)
IO.puts(nil && 13)
IO.puts(true && 17)
IO.puts(!true)
IO.puts(!1)
IO.puts(!nil)

# Match operator
x = 1
IO.puts(1 = x)
# 2 = x # would raise a MatchError
# 1 = unknown # would raise a CompileError

# Pattern matching
{a, b, c} = {:hello, "world", 42}
IO.puts(a)
IO.puts(b)
IO.puts(c)
# {a, b, c} = [:hello, "world", 42] # would raise MatchError
{:ok, result} = {:ok, 13}
IO.puts(result)
# {:ok, result} = {:error, :oops} # would raise MatchError
[a, b, c] = [1, 2, 3]
IO.puts(a)
IO.puts(b)
IO.puts(c)
[head | tail] = [1, 2, 3]
IO.puts(head)
IO.inspect(tail)
list = [1, 2, 3]
IO.inspect([0 | list])
x = 1
# ^x = 2 # would raise MatchError
# use ^ (pin operator) to match on value rather than rebind
{y, ^x} = {2, 1}
IO.puts(y)
# {y, ^x} = {2, 2} # would raise MatchError
{x, x} = {1, 1}
# {x, x} = {1, 2} # would raise MatchError
# use _ to ignore things
[h | _] = [1, 2, 3]
IO.puts(h)
# cannot put function calls on the left side of a match
# length([1, [2], 3]) = 3 # would raise CompileError

# case
x = 5

case {1, 2, 3} do
  {4, 5, 6} ->
    IO.puts("Will not match")

  {1, ^x, 3} ->
    "Match against existing x value (will not match)"

  {1, x, 3} when x > 3 ->
    IO.puts("Will not match because of when guard")

  {1, x, 3} ->
    IO.puts("Will match and bind 2 to x")
    IO.puts(x)

  _ ->
    IO.puts("Would match anything")
end

# errors in guards do not leak but simply make the guard fail (calling hd(1) raises an error)
case 1 do
  x when hd(x) -> IO.puts("Won't match")
  x -> IO.puts("Got #{x}")
end

# a CaseClauseError is raised if no matches are found

# anonymous functions can have multiple clauses but they must have the same number of arguments
f = fn
  x, y when x > 0 -> x + y
  x, y -> x * y
end

IO.puts(f.(1, 2))
IO.puts(f.(-1, 1))

# cond is like an else-if for conditions rather than pattern matching
# cond considers any value besides nil and false to be true
cond do
  2 + 2 == 5 ->
    IO.puts("This is never true")

  2 * 2 == 3 ->
    IO.puts("Nor this")

  hd([1, 2, 3]) ->
    IO.puts("1 is considered as true")

  true ->
    IO.puts("This is always true (equivalent to else)")
end

# if and unless only check one value (they are macros)
if true do
  IO.puts("This works!")
else
  IO.puts("This will not print")
end

unless true do
  IO.puts("This will never be seen")
end

# example of keyword lists to "if" function
IO.puts(if false, do: :this, else: :that)

# do/end blocks are sugar; these blocks are equivaletn
if true do
  a = 1 + 2
  a + 10
  IO.puts(a)
end

if true,
  do:
    (
      a = 1 + 2
      a + 10
      IO.puts(a)
    )

# keyword maps are [key: value]
# keys must be atoms, are ordered as specified by the developer, and can exist more than once
list = [{:a, 1}, {:b, 2}]
IO.puts(list == [a: 1, b: 2])
IO.inspect([z: 0] ++ list ++ [c: 3])

# things in the front are retrieved first
new_list = [a: 0] ++ list
IO.puts(new_list[:a])

IO.puts(if false, do: :this, else: :that)
# the "if" syntax is equivalent to
IO.puts(if(false, do: :this, else: :that))

# maps allow any values as keys, and are unordered
map = %{:a => 1, 2 => :b}
IO.inspect(map)
IO.puts(map[:a])
IO.puts(map[2])
# nil
IO.puts(map[:c])

# useful for pattern matching; will match as long as keys in pattern exist in the map (empty map matches all maps)
IO.inspect(%{} = %{:a => 1, 2 => :b})
%{:a => a} = %{:a => 1, 2 => :b}
IO.puts(a)
# %{:c => c} = %{:a => 1, 2 => :b} # raises MatchError
# can use variables as keys
n = 1
map = %{n => :one}
IO.puts(map[n])
# Map module has get/2, put/3, and to_list/1
# Maps can be updated
map = %{:a => 1, 2 => :b}
IO.inspect(%{map | 2 => "two"})
# %{map | :c => 3} # would raise KeyError
# special syntax for atom keys (example of "assertive" code)
IO.puts(map.a)
