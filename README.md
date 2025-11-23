# Gerar

[![npm version](https://img.shields.io/npm/v/gerar.svg)](https://www.npmjs.com/package/gerar)

CLI brasileiro para gerar dados fictícios válidos para testes.

## Instalação

```bash
npm i -g gerar
```

## Exemplo de Uso

Gera um dado fictício válido, nesse caso CPF:

```bash
gerar cpf
```

Gera múltiplos dados:

```bash
gerar cpf --amount 5
# ou
gerar cpf -a 5
```

**Exemplo de saída:**

```
CPF 1) Com Máscara: 123.456.789-00 - Sem Máscara: 12345678900
```

## Roadmap

| Funcionalidade                                    | Status      |
| ------------------------------------------------- | ----------- |
| CPF                                               | ✅ Completo |
| CNPJ                                              | ✅ Completo |
| Cartão de crédito com base na bandeira            | ⏳ Pendente |
| Endereço                                          | ⏳ Pendente |
| UUID v4                                           | ⏳ Pendente |
| UUID v7                                           | ⏳ Pendente |
| Autocomplete no Terminal                          | ⏳ Pendente |
| Localização de endereço norte-americano e europeu | ⏳ Pendente |

## Licença

Este projeto está licenciado sob a licença MIT. Para mais informações, consulte a [página do pacote no NPM](https://www.npmjs.com/package/gerar).
