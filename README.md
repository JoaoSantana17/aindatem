
# Ainda Tem? 

## Desenvolvido por

**João Vitor Santana - RM560781**  
[GitHub](https://github.com/JoaoSantana17)  
[LinkedIn](https://www.linkedin.com/in/joão-vitor-santana-560898313/)

**Adão Yuri Ferreira da Silva - RM559223**  
[GitHub](https://github.com/Yuri-t0)  
[LinkedIn](https://www.linkedin.com/in/yuri-ferreira-992a231a0/)

**Guilherme Jun Conheci - RM559986**  
[GitHub](https://github.com/GuilhermeJun)  
[LinkedIn](https://www.linkedin.com/in/guilherme-jun/)


Aplicação web para facilitar o **cadastro, busca e visualização de recursos essenciais** em situações de emergência. Cidadãos e órgãos podem se cadastrar, visualizar suprimentos próximos, aplicar filtros e consultar detalhes de cada local.

> Acesse: [https://aindatem.vercel.app](https://aindatem.vercel.app)

---

## Estrutura de Pastas

```
app/
│
├── page.tsx # Login de usuário
├── cadastro 
│    └── page.tsx # Cadastro de usuário            
├── dashboard/
│   ├── page.tsx            # Dashboard principal com lista de recursos
│   └── cadastrar/page.tsx  # Formulário para cadastrar recurso
│
└── components/             # Componentes reutilizáveis (header, filtros, etc.)
```

---

##  Funcionalidades

- ✅ Cadastro e login de usuários
- ✅ Dashboard com saudação personalizada
- ✅ Filtros por:
  - Nome do local
  - Tipo de recurso
  - Fonte (Oficial / Comunitária)
  - Distância (Até 1Km, 5Km, 10Km)
- ✅ Lista de recursos com detalhes
- ✅ Modal com:
  - Endereço
  - Contato
  - Horário de funcionamento
  - Mapa do local
- ✅ Cadastro de novo recurso (formulário)
- ✅ Armazenamento temporário via `localStorage` para recarregar dashboard

---

## Testes Manuais Recomendados

- [ ] Acessar como novo usuário e se cadastrar
- [ ] Filtrar recursos no dashboard
- [ ] Abrir detalhes com mapa
- [ ] Cadastrar um novo recurso com/sem localização
- [ ] Verificar responsividade em dispositivos móveis


