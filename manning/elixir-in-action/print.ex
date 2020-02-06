defmodule Print do
  import IO

  def my_function do
    puts "Calling imported function."
  end
end

defmodule Print2 do
  alias IO, as: MyIO

  def my_function do
    MyIO.puts("Calling aliased function.")
  end
end
