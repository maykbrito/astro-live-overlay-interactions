<template>
  <div class="p-4 w-full max-w-[420px]">
    <h2 class="text-xl font-bold mb-4">Configurações do tema do chat</h2>
    <form @submit.prevent="salvarFeatures" class="space-y-4">
      <div>
        <label for="corTituloChat" class="block text-sm font-medium text-gray-700">Cor do Título do Chat:</label>
        <input type="color" id="corTituloChat" v-model="features.theme.corTituloChat" class="mt-1 rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="corMensagem" class="block text-sm font-medium text-gray-700">Cor da Mensagem:</label>
        <input type="color" id="corMensagem" v-model="features.theme.corMensagem" class="mt-1 rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="corBadgeModerado" class="block text-sm font-medium text-gray-700">Cor da Badge de Moderador:</label>
        <input type="color" id="corBadgeModerado" v-model="features.theme.corBadgeModerado" class="mt-1 rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="corFundoChat" class="block text-sm font-medium text-gray-700">Cor de Fundo do Item do Chat:</label>
        <input type="color" id="corFundoChat" v-model="features.theme.corFundoChat" class="mt-1 rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div class="flex items-center">
        <input type="checkbox" id="habilitarAvatar" v-model="features.theme.habilitarAvatar" class="rounded border-gray-300 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <label for="habilitarAvatar" class="ml-2 block text-sm text-gray-900">Habilitar Avatar</label>
      </div>
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
        <input type="text" id="thumbnail" v-model="features.thumbnail" class="mt-1 w-full border p-2 rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
    </form>

    <button
      @click="atualizarArquivoJSON"
      class="p-4 rounded-md bg-blue-500 text-white font-bold uppercase my-4"
    >
      Atualizar Configs
    </button>

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

const thumbnail = ref('https://github.com/maykbrito.png');

const features = ref({
  istwitch: true, 
  isyoutube: false, 
  subscriber: true, 
  mod: true, 
  thumbnail: thumbnail.value,
  theme: {
    corTituloChat: '#FFFFFF', 
    corBadgeModerado: '#EAB308', 
    corFundoChat: '#111827',  
    corMensagem: '#9CA3AF',
    habilitarAvatar: false 
  }
});

onMounted(() => {
  const configuracaoSalva = localStorage.getItem('configuracao');
  if (configuracaoSalva) { 
    const configLoaded = JSON.parse(configuracaoSalva);

    features.value.theme.corTituloChat = configLoaded.corTituloChat,
    features.value.theme.corBadgeModerado = configLoaded.corBadgeModerado,
    features.value.theme.corFundoChat = configLoaded.corFundoChat,
    features.value.theme.corMensagem = configLoaded.corMensagem,
    features.value.theme.habilitarAvatar = configLoaded.habilitarAvatar
  }
});

const salvarFeatures = () => {
  features.value = {
    ...features.value,
    istwitch: istwitch.checked,
    isyoutube: isyoutube.checked,
    subscriber: subscriber.checked,
    mod: mod.checked,
    thumbnail: thumbnail.value,
    theme:{
      corTituloChat: corTituloChat.value, 
      corBadgeModerado: corBadgeModerado.value, 
      corFundoChat: corFundoChat.value, 
      corMensagem: corMensagem.value, 
      habilitarAvatar: habilitarAvatar.value
    }
  }
};

const atualizarArquivoJSON = async () => {
  try {
    localStorage.setItem("configuracao", JSON.stringify(features.value.theme))
      
    const response = await fetch('/api/options', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(features.value.theme),
    });

    if (response.ok) {
      alert('Arquivo JSON atualizado com sucesso!');
    } else {
      console.error('Erro ao atualizar arquivo JSON:', response.statusText);
    }
  } catch (error) {
    console.error('Erro ao atualizar arquivo JSON:', error.message);
  }
};

</script>