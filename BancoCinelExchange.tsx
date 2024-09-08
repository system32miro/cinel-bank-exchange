import React, { useState, useEffect } from 'react'
import { CreditCard, Users, ArrowUpDown, PlusCircle, Trash2 } from 'lucide-react'

const tabItems = [
    { name: 'Inserir Cliente', icon: <PlusCircle size={16} /> },
    { name: 'Consultar saldo', icon: <CreditCard size={16} /> },
    { name: 'Realizar levantamento', icon: <ArrowUpDown size={16} /> },
    { name: 'Listar clientes', icon: <Users size={16} /> },
    { name: 'Realizar depósito', icon: <ArrowUpDown size={16} /> },
    { name: 'Apagar Cliente', icon: <Trash2 size={16} /> },
]

interface Cliente {
    id: number;
    nome: string;
    saldo: number;
}

export default function BancoCinelExchange() {
    const [activeTab, setActiveTab] = useState('inserir-cliente')
    const [clientName, setClientName] = useState('')
    const [initialBalance, setInitialBalance] = useState('')
    const [message, setMessage] = useState('')
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [globvar, setGlobvar] = useState(0)
    const [clientId, setClientId] = useState('')
    const [amount, setAmount] = useState('')

    useEffect(() => {
        setMessage('');
    }, [activeTab]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const saldo = parseFloat(initialBalance)
        if (saldo < 0) {
            setMessage("Saldo tem que ser positivo!")
        } else {
            setGlobvar(prev => prev + 1)
            setClientes(prev => [...prev, { id: globvar + 1, nome: clientName, saldo }])
            setMessage(`Cliente ${clientName} inserido com saldo inicial de ${saldo}€`)
            setClientName('')
            setInitialBalance('')
        }
    }

    const consultarSaldo = (e: React.FormEvent) => {
        e.preventDefault()
        const id = parseInt(clientId)
        const cliente = clientes.find(c => c.id === id)
        if (cliente) {
            setMessage(JSON.stringify(cliente))
        } else {
            setMessage("Cliente não encontrado")
        }
        setClientId('')
    }

    const realizarLevantamento = (e: React.FormEvent) => {
        e.preventDefault()
        const id = parseInt(clientId)
        const valor = parseFloat(amount)
        const cliente = clientes.find(c => c.id === id)
        if (cliente) {
            if (valor <= 0) {
                setMessage("Valor inserido incorreto!")
            } else if (cliente.saldo < valor) {
                setMessage(`Saldo Insuficiente! Saldo Disponível: ${cliente.saldo}€`)
            } else {
                setClientes(prev => prev.map(c => c.id === id ? { ...c, saldo: c.saldo - valor } : c))
                setMessage(`Levantamento com sucesso! Novo saldo: ${cliente.saldo - valor}€`)
            }
        } else {
            setMessage("Cliente não encontrado")
        }
        setClientId('')
        setAmount('')
    }

    const listarClientes = () => {
        if (clientes.length === 0) {
            setMessage("Não há clientes cadastrados.")
        } else {
            setMessage(JSON.stringify(clientes))
        }
    }

    const realizarDeposito = (e: React.FormEvent) => {
        e.preventDefault()
        const id = parseInt(clientId)
        const valor = parseFloat(amount)
        const cliente = clientes.find(c => c.id === id)
        if (cliente) {
            if (valor <= 0) {
                setMessage("Valor inserido incorreto")
            } else {
                setClientes(prev => prev.map(c => c.id === id ? { ...c, saldo: c.saldo + valor } : c))
                setMessage(`Depósito com sucesso. Novo saldo: ${cliente.saldo + valor}€`)
            }
        } else {
            setMessage("Cliente não encontrado")
        }
        setClientId('')
        setAmount('')
    }

    const apagarCliente = (e: React.FormEvent) => {
        e.preventDefault()
        const id = parseInt(clientId)
        const index = clientes.findIndex(c => c.id === id)
        if (index !== -1) {
            setClientes(prev => prev.filter(c => c.id !== id))
            setMessage("Cliente removido com sucesso")
        } else {
            setMessage("Cliente não encontrado")
        }
        setClientId('')
    }

    const renderResultado = () => {
        if (!message) return null;

        try {
            const data = JSON.parse(message);
            if (Array.isArray(data)) {
                return (
                    <div className="mt-4 bg-gray-100 p-4 rounded-md shadow">
                        <h3 className="text-lg font-semibold mb-2">Lista de Clientes</h3>
                        <ul className="space-y-2">
                            {data.map((cliente: Cliente) => (
                                <li key={cliente.id} className="bg-white p-2 rounded shadow-sm">
                                    <span className="font-medium">ID: {cliente.id}</span> -
                                    <span className="ml-2">{cliente.nome}</span>
                                    <span className="ml-2 text-green-600">Saldo: {cliente.saldo}€</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            } else if (typeof data === 'object') {
                return (
                    <div className="mt-4 bg-gray-100 p-4 rounded-md shadow">
                        <h3 className="text-lg font-semibold mb-2">Detalhes do Cliente</h3>
                        <p><span className="font-medium">ID:</span> {data.id}</p>
                        <p><span className="font-medium">Nome:</span> {data.nome}</p>
                        <p><span className="font-medium">Saldo:</span> {data.saldo}€</p>
                    </div>
                );
            }
        } catch {
            return (
                <p className="mt-4 text-red-600 text-center font-medium">
                    {message}
                </p>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-purple-200 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white shadow-2xl rounded-lg overflow-hidden">
                <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
                    <h1 className="text-4xl font-bold">Banco Cinel Exchange</h1>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                        {tabItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    setActiveTab(item.name.toLowerCase().replace(' ', '-'));
                                    setMessage('');
                                }}
                                className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg text-lg ${activeTab === item.name.toLowerCase().replace(' ', '-')
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {React.cloneElement(item.icon, { size: 24 })}
                                <span className="hidden sm:inline">{item.name}</span>
                            </button>
                        ))}
                    </div>

                    {activeTab === 'inserir-cliente' && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome do cliente
                                </label>
                                <input
                                    id="clientName"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700 mb-1">
                                    Saldo inicial (€)
                                </label>
                                <input
                                    id="initialBalance"
                                    type="number"
                                    value={initialBalance}
                                    onChange={(e) => setInitialBalance(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                                Inserir Cliente
                            </button>
                        </form>
                    )}

                    {activeTab === 'consultar-saldo' && (
                        <form onSubmit={consultarSaldo} className="space-y-6">
                            <div>
                                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                                    ID do cliente
                                </label>
                                <input
                                    id="clientId"
                                    type="number"
                                    value={clientId}
                                    onChange={(e) => setClientId(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                                Consultar Saldo
                            </button>
                        </form>
                    )}

                    {activeTab === 'realizar-levantamento' && (
                        <form onSubmit={realizarLevantamento} className="space-y-6">
                            <div>
                                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                                    ID do cliente
                                </label>
                                <input
                                    id="clientId"
                                    type="number"
                                    value={clientId}
                                    onChange={(e) => setClientId(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                                    Valor a levantar (€)
                                </label>
                                <input
                                    id="amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                                Realizar Levantamento
                            </button>
                        </form>
                    )}

                    {activeTab === 'listar-clientes' && (
                        <button onClick={listarClientes} className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                            Listar Clientes
                        </button>
                    )}

                    {activeTab === 'realizar-depósito' && (
                        <form onSubmit={realizarDeposito} className="space-y-6">
                            <div>
                                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                                    ID do cliente
                                </label>
                                <input
                                    id="clientId"
                                    type="number"
                                    value={clientId}
                                    onChange={(e) => setClientId(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                                    Valor a depositar (€)
                                </label>
                                <input
                                    id="amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                                Realizar Depósito
                            </button>
                        </form>
                    )}

                    {activeTab === 'apagar-cliente' && (
                        <form onSubmit={apagarCliente} className="space-y-6">
                            <div>
                                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                                    ID do cliente
                                </label>
                                <input
                                    id="clientId"
                                    type="number"
                                    value={clientId}
                                    onChange={(e) => setClientId(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                                Apagar Cliente
                            </button>
                        </form>
                    )}

                    {renderResultado()}
                </div>
            </div>
        </div>
    )
}