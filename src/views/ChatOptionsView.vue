<template>
  <div class="p-4 w-full max-w-[420px]">
    <h2 class="text-xl font-bold mb-4">Configurações do tema do chat</h2>
    <form @submit.prevent="salvarConfiguracoes" class="space-y-4">
      <div>
        <label for="corTituloChat" class="block text-sm font-medium text-gray-700">Cor do Título do Chat:</label>
        <input type="color" id="corTituloChat" v-model="configuracoes.corTituloChat" class="mt-1 rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="corMensagem" class="block text-sm font-medium text-gray-700">Cor da Mensagem:</label>
        <input type="color" id="corMensagem" v-model="configuracoes.corMensagem" class="mt-1 rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="corBadgeModerado" class="block text-sm font-medium text-gray-700">Cor da Badge de Moderador:</label>
        <input type="color" id="corBadgeModerado" v-model="configuracoes.corBadgeModerado" class="mt-1 rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="corFundoChat" class="block text-sm font-medium text-gray-700">Cor de Fundo do Item do Chat:</label>
        <input type="color" id="corFundoChat" v-model="configuracoes.corFundoChat" class="mt-1 rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="habilitarAvatar" v-model="configuracoes.habilitarAvatar" class="rounded border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <label for="habilitarAvatar" class="ml-2 block text-sm text-gray-900">Habilitar Avatar</label>
      </div>
      <button type="submit" class="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">Salvar Alterações</button>
    </form>

    <h4 class="text-xl font-bold mb-4">Visualizar</h4>
    <form @submit.prevent="salvarFeatures" class="space-y-4">
      <div class="flex gap-2 my-4">
        <div class="flex items-center">
          <input type="checkbox" id="istwitch" v-model="features.istwitch" class="rounded border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <label for="istwitch" class="ml-2 block text-sm text-gray-900">É Twitch</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" id="isyoutube" v-model="features.isyoutube" class="rounded border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <label for="isyoutube" class="ml-2 block text-sm text-gray-900">É Youtube</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" id="subscriber" v-model="features.subscriber" class="rounded border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <label for="subscriber" class="ml-2 block text-sm text-gray-900">É Subscriber</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" id="mod" v-model="features.mod" class="rounded border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <label for="mod" class="ml-2 block text-sm text-gray-900">É Mod</label>
        </div>
      </div>
      <div>
        <label for="thumbnail" class="block text-sm font-medium text-gray-700">URL da Thumbnail:</label>
        <input type="text" id="thumbnail" v-model="features.thumbnail" class="mt-1 rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
    </form>

    <div
      id="chat"
      class="w-full flex my-4 horizontal"
    >
      <StreamChat
        message="A mensagem aparecerá assim!"
        user="FulaninhoDeTal"
        :extra="features"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import StreamChat from '@/components/StreamChat.vue'
import { ref, onMounted } from 'vue';

const configuracoes = ref({
  corTituloChat: '#FFFFFF', 
  corBadgeModerado: '#EAB308', 
  corFundoChat: '#111827',  
  corMensagem: '#9CA3AF',
  habilitarAvatar: false 
});

const thumbnail = ref('https://github.com/maykbrito.png');

const features = ref({
  istwitch: true, 
  isyoutube: false, 
  subscriber: true, 
  mod: true, 
  thumbnail: thumbnail.value,
  theme:{
    ...configuracoes.value
  }
});

onMounted(() => {
  const configLocalStorage = localStorage.getItem('configuracoes');
  if (configLocalStorage) {
    Object.assign(configuracoes.value, JSON.parse(configLocalStorage));
  }
});

const atualizarLocalStorage = () => {
  localStorage.setItem('configuracoes', JSON.stringify(configuracoes.value));
  salvarFeatures()
};

const salvarFeatures = () => {
  features.value = {
    ...features.value,
    istwitch: istwitch.checked,
    isyoutube: isyoutube.checked,
    subscriber: subscriber.checked,
    mod: mod.checked,
    thumbnail: thumbnail.value,
    theme:{
      ...configuracoes.value
    }
  };
};

const salvarConfiguracoes = () => {
  atualizarLocalStorage();
};
</script>