# juste prix en python
from random import randint
import random
guess = int(input("Enter a number between 1 & 20"))
rand_number = random.randrange(20)


def guess_function(guess_numb, random):
    if guess_numb > random:
        print("less")
        guess_numb = int(input("reguess a numb"))
        guess_function(guess_numb, random)
    elif guess_numb < random:
        print("more")
        guess_numb = int(input("reguess a numb"))
        guess_function(guess_numb, random)
    elif guess_numb == random:
        print("Perfecto")


guess_function(guess, rand_number)
# OR
# demander le nombre entré -> conversion en int -> vérifier si > , < ou =

# prendre un nombre léatoire
minimum = 0
maximum = 100
nb_aleatoire = randint(minimum, maximum)
print(nb_aleatoire)

# fonction pour vérifier que nb entier entre min et max


def verifiNumber():
    '''Fonction qui vérifie que entier en entrée et compris entre min et max inclus'''
    while True:
        nb_entre = input(
            'Entrez un nombre entre {} et {} : '.format(minimum, maximum))
        try:
            nb_entre = int(nb_entre)
            if nb_entre > maximum or nb_entre < minimum:
                print('Nb hors intervalle')
                continue
        except ValueError:
            print('Donnee invalide')
            continue
        else:
            return nb_entre
            break


# vérifier que supo in ou =
while True:
    nb_entre = verifiNumber()
    if nb_entre < nb_aleatoire:
        print('Plus')
    elif nb_entre > nb_aleatoire:
        print('Moins')
    else:
        break
print('Feliciation le nombre mystere etait : ', nb_aleatoire)
