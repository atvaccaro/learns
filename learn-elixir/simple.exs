# Printing stuff
IO.puts "Hello world from Elixir"

# Anonymous function; use period when calling
add = fn a, b -> a + b end
IO.puts add.(1,2)

# Closure
double = fn a -> add.(a, a) end
IO.puts double.(2)

# Linked lists
a = [1, 2, 3]
b = [4, 5, 6]
IO.inspect a ++ b

IO.puts hd(a)
IO.inspect tl(a)

# Single quotes are charlists, double quotes are strings
IO.puts 'hello' == "hello"

# Tuples
IO.inspect {:ok, "hello"}
IO.puts elem({:ok, "hello"}, 1)

IO.inspect put_elem({:a, :b, :c, :d}, 2, :e)

# Files
IO.inspect File.read("test.txt")
IO.inspect File.read("nothing.nothing")

# Operators
IO.puts "foo" <> "bar"
IO.puts true and true
IO.puts false or is_atom(:example)
IO.puts false and raise("This error will never be raised")
IO.puts 1 || true
IO.puts false || 11
IO.puts nil && 13
IO.puts true && 17
IO.puts !true
IO.puts !1
IO.puts !nil

# Match operator
x = 1
IO.puts 1 = x
# 2 = x # would raise a MatchError
# 1 = unknown # would raise a CompileError

# Pattern matching
{a, b, c} = {:hello, "world", 42}
IO.puts a
IO.puts b
IO.puts c
# {a, b, c} = [:hello, "world", 42] # would raise MatchError
