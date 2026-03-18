with open("sygnaly.txt") as f:
    words = [line.strip() for line in f]


result_41 = ""

for i in range(39, len(words), 40):
    word = words[i]
    result_41 += word[9]



max_unique = 0
best_word = ""

for word in words:
    unique_letters = len(set(word))
    if unique_letters > max_unique:
        max_unique = unique_letters
        best_word = word

result_42 = f"{best_word} {max_unique}"



def good_word(word):
    letters = set(word)
    for a in letters:
        for b in letters:
            if abs(ord(a) - ord(b)) > 10:
                return False
    return True

result_43 = [word for word in words if good_word(word)]



with open("wyniki4.txt", "w") as f:
    f.write("4.1\n")
    f.write(result_41 + "\n")

    f.write("4.2\n")
    f.write(result_42 + "\n")

    f.write("4.3\n")
    for word in result_43:
        f.write(word + "\n")
