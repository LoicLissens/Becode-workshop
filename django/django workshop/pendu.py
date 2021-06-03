from random import randrange
import re
letters = []

# on va prendre un mot aléatoire


def takeRandomWord():
    with open('dico.txt', 'r') as dico:
        dico_content = dico.read()
        # print(dico_content) #works fine
        dico_list = dico_content.split('\n')
        # print(dico_list) #on peut tout mettre en une ligne mais bon
        random_word = dico_list[randrange(len(dico_list))]
        return random_word


def askLetter():
    '''Function asking for a lettre [a-z] no accent or number , no string only single character'''
    # adapter la fonction pour vérifier que mot pas déjà entré
    while(True):
        letter = input('Entrez une lettre minucule, pas d \'accents ')
        letter = letter.strip()
        if(len(letter) != 1):
            print('vous devez entrer un caractere unique')
            continue
        elif re.search("[a-z]{1}", letter) is None:
            print('vous ne pouvez pas mettre de caracteres hors [a-z]')
            continue
        elif letter in letters:
            print('caractere deja entre ! ')
            continue
        else:
            letter = letter.upper()
            return letter


def displayWord():
    '''Fonction pour afficher le mot selon les entrées'''
    guessingWord = ''
    won = True
    for character in word:
        if character in letters:
            guessingWord += character
        else:
            guessingWord += '*'
            won = False
    print(guessingWord)
    return won


word = takeRandomWord()


def main():
    '''Main function'''
    while(True):
        displayWord()
        letter = askLetter()
        letters.append(letter)
        won = displayWord()
        if(won):
            break
    print('Feliciations vous avez gagne')

# ensuite faiut le code pour compartimenter tout ca


main()
