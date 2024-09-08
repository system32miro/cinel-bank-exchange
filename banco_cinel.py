clientes = []
globvar = 0

def variavelglobal():
    global globvar      
    globvar = globvar+1

def mostrar_menu():
    print("Banco Cinel Exange")
    print("---- Menu ----")
    print("1. Inserir Cliente")
    print("2.Consultar saldo de um Cliente")
    print("3.Realizar um levantamento - Cliente")
    print("4.Listar todos os clientes")
    print("5.Realizar um depósito - Cliente")
    print("6.Apagar Cliente")
    print("7.Fechar a aplicação")

def inserir():
    print("\n")
    nome = input("Introduza nome de cliente: ")
    saldo=float(input("Saldo inicial: "))
    verifica = False
    if  saldo < 0:
        print("Saldo tem que ser positivo!")
        print("\n")
    else:
        variavelglobal()
        clientes.append((globvar, nome, saldo))
        print("\n\nCliente inserido com sucesso!\n\n")
        verifica=True

    if not verifica:
        print("Cliente não inserido")
        print("\n")


def listar_clientes():
    print("\n")
    if not clientes:
        print("A Lista nestá vazia")
        print("\n")
    else:
        print(f"{'ID':<5}{'Nome':<10}")
        for id, nome, saldo in clientes:
            print(f"{id:<5}{nome:<10}")
        print("\n\n")


def verifica_cliente():
    print("\n")
    listar_clientes()
    verifica= False
    id_client = int(input("Insira id d2o cliente: "))
    for id, nome, saldo in clientes:
        if id == id_client:
            print(f"{'ID':<5}{'Nome':<10}{'Saldo'}")
            print(f"{id:<5}{nome:<10}{saldo}")
            verifica=True
            print("\n")
            break
    if not verifica:
        print("Cliente não encontrado")

def levantar():
    print("\n")
    listar_clientes()
    id_client = int(input("Insira id do cliente: "))
    verifica= False
    for cliente, item in enumerate(clientes):
        if item[0] == id_client:
            value = float(input("Insira dinheiro a levantar: "))
            if value<=0:
                print("Valor inserido incorreto!")
                verifica = True
            elif item[2] < value:
                print("\n\nSaldo Insuficiente! \nSaldo Dísponível: ", item[2],"\n\n")
                verifica = True
            else:
                saldo = item[2]-value
                clientes[cliente]=(item[0],item[1], saldo)
                verifica = True
                print("Levantamento com sucesso!\nSaldo: ", saldo)
                print("\n")

    if not verifica:
        print("Cliente não encontrado")
        print("\n")


def depositar():
    print("\n")
    listar_clientes()
    id_cliente = int(input("Insira id do cliente: "))
    verifica = False
    for cliente, item in enumerate(clientes):
        if item[0] == id_cliente:
            value = float(input("Insira valor a depositar: "))
            if value <= 0:
                print("Valor inserido incorreto")
                verifica = True
            else:
                saldo = item[2]+value
                clientes[cliente] = (item[0], item[1], saldo)
                verifica = True
                print("Depósito com sucesso.\nSaldo: ", saldo)
                print("\n")

    if not verifica:
        print("Cliente não encontrado")
        print("\n")

def apagar():
        listar_clientes()
        id_cliente = int(input("Insira id do cliente: "))
        verifica = False
        for cliente, item in enumerate(clientes):
            if item[0] == id_cliente:
                clientes.pop(cliente)
                verifica = True
                break

        if not verifica:
            print("Cliente não encontrado")
            print("\n")


while True:
        opcao=0
        mostrar_menu()
        opcao=input("Insira a opção: ")
        if opcao == "1":
            inserir()
        elif opcao == "2":
            verifica_cliente()
        elif opcao == "3":
            levantar()
        elif opcao == "4":
            listar_clientes()
        elif opcao == "5":
            depositar()
        elif opcao == "6":
            apagar()
        elif opcao == "7":
            print("Obrigado! Progama terminado!")
            break
        else:
            print("Opção Invalida")