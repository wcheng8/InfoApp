def get_strings(city):
  lcity = city.lower()
  print(lcity)
  dictionary = {}
  for letter in lcity:
    dictionary[letter] = dictionary.get(letter, '*')+"*"
  print(zip(str(dictionary)))

get_strings('Chicago')