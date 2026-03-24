<template>
    <div class="min-vh-100 d-flex align-items-center bg-dark bg-gradient">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5">
  
            <div class="card shadow-lg border-0 bg-white">
              <div class="card-body p-4 text-center">
  
                <h5 class="text-muted">REDEFINIR SENHA</h5>
  
                <img src="../images/ikesaki_logo.png" width="250" class="my-3" />
  
                <form @submit.prevent="submit">
  
                  <!-- EMAIL -->
                  <div class="mb-3 text-start">
                    <label>E-mail</label>
                    <input type="email" class="form-control" v-model="form.email" required />
                  </div>
  
                  <!-- CODE -->
                  <div class="mb-3 text-start">
                    <label>Código de verificação</label>
                    <input class="form-control" v-model="form.code" required />
                  </div>
  
                  <!-- NOVA SENHA -->
                  <div class="mb-3 text-start position-relative">
                    <label>Nova senha</label>
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      v-model="form.newPassword"
                      required
                    />
                    <span class="eye" @click="showPassword = !showPassword">👁️</span>
                  </div>
  
                  <!-- CONFIRMAR SENHA -->
                  <div class="mb-3 text-start position-relative">
                    <label>Confirmar senha</label>
                    <input
                      :type="showConfirm ? 'text' : 'password'"
                      class="form-control"
                      v-model="form.confirmPassword"
                      required
                    />
                    <span class="eye" @click="showConfirm = !showConfirm">👁️</span>
                  </div>
  
                  <div class="d-grid">
                    <button class="btn btn-danger" :disabled="loading">
                      <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                      Redefinir senha
                    </button>
                  </div>
  
                </form>
  
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const loading = ref(false)
  const showPassword = ref(false)
  const showConfirm = ref(false)
  
  const form = reactive({
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const submit = async () => {
    loading.value = true
  
    try {
      await axios.post('https://ikesakiconciliacao.imp-tec.com/api/auth/reset-password', {
        Email: form.email,
        Code: form.code,
        NewPassword: form.newPassword,
        ConfirmPassword: form.confirmPassword
      })
  
      await Swal.fire('Sucesso', 'Senha redefinida com sucesso', 'success')
  
      router.push('/')
  
    } catch (error) {
      Swal.fire('Erro', 'Erro ao redefinir senha', 'error')
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .bg-gradient {
    background: linear-gradient(135deg, #422727, #2a5298);
  }
  
  .eye {
    position: absolute;
    right: 10px;
    top: 38px;
    cursor: pointer;
  }
  </style>