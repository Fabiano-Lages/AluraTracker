import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Tarefas from '../views/TarefasTracker.vue';
import Projetos from '../views/ProjetosTracker.vue';
import ListaProjetos from '../views/Projetos/ListaProjetos.vue';
import FormularioProjeto from '../views/Projetos/FormularioProjeto.vue';


const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        component: Projetos,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: ListaProjetos
            },
            {
                path: 'novo',
                name: 'Novo projeto',
                component: FormularioProjeto
            },
            {
                path: ':id',
                name: 'Editar projetos',
                component: FormularioProjeto,
                props: true
            },
            {
                path: 'exclui/:id',
                name: 'Excluir projeto',
                component: FormularioProjeto,
                props: true
            }
        ]
    }
];

const roteador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
});

export default roteador;