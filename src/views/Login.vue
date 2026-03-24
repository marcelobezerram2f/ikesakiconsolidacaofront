<template>
  <div class="min-vh-100 d-flex align-items-center bg-dark bg-gradient">
    <div class="container">
      <div class="row justify-content-center">
        
        <!-- Ajuste responsivo por breakpoint -->
        <div class="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
          
          <div class="card shadow-lg border-0 bg-white">
            <div class="card-body p-3 p-md-4 p-lg-5">

              <div class="text-center mb-4">
                <h5 class="text-muted small">BEM VINDO À IKESAKI</h5>

                <!-- Imagem responsiva -->
                <img
                  src="../images/ikesaki_logo.png"
                  class="img-fluid my-3"
                  style="max-width: 200px;"
                />

                <h6 class="text-muted small">Entre com suas credenciais</h6>
              </div>

              <form @submit.prevent="submitLogin">

                <div class="mb-3">
                  <label class="form-label">E-mail</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="form.email"
                    required
                  />
                  <div v-if="errors.email" class="text-danger small mt-1">
                    {{ errors.email }}
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Senha</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="form.password"
                    required
                  />
                  <div v-if="errors.password" class="text-danger small mt-1">
                    {{ errors.password }}
                  </div>
                </div>

                <div class="d-grid mb-3">
                  <button
                    type="submit"
                    class="btn btn-danger"
                    :disabled="loading"
                  >
                    <span
                      v-if="loading"
                      class="spinner-border spinner-border-sm me-2"
                    ></span>
                    Login
                  </button>
                </div>

                <div class="text-center">
                  <router-link
                    to="/forgot-password"
                    class="btn btn-outline-secondary btn-sm w-100 w-md-auto"
                  >
                    Esqueci minha senha...
                  </router-link>
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
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const loading = ref(false)

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: null,
  password: null
})

const submitLogin = async () => {
  loading.value = true
  errors.email = null
  errors.password = null

  // Loading
  Swal.fire({
    title: 'Processando...',
    text: 'Realizando login',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => Swal.showLoading()
  })

  try {
    const response = await axios.post(
      'https://ikesakiconciliacao.imp-tec.com/api/auth/login',
      form
    )

    const data = response.data

    // ✅ Salvar no localStorage
    localStorage.setItem('auth', JSON.stringify({
      id: data.id,
      name: data.name,
      email: data.email,
      token: data.token
    }))

    localStorage.setItem('token', data.token)

    // ✅ Sucesso
    
    await Swal.close()

    router.push('/dashboard')

  } catch (error) {

    // ❌ Tratamento com SweetAlert
    if (error.response) {

      if (error.response.status === 422) {
        Swal.fire('Erro', 'Preencha os campos corretamente', 'error')

      } else if (error.response.status === 401) {
        Swal.fire('Erro', 'E-mail ou senha inválidos', 'error')

      } else {
        Swal.fire('Erro', 'Erro ao realizar login', 'error')
      }

    } else {
      Swal.fire('Erro', 'Erro de conexão com o servidor', 'error')
    }

  } finally {
    loading.value = false
  }
}

</script>