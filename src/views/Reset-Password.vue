<template>
  <div class="min-vh-100 d-flex align-items-center bg-dark bg-gradient">
    <div class="container">
      <div class="row justify-content-center">

        <!-- Grid responsivo -->
        <div class="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">

          <div class="card shadow-lg border-0 bg-white">
            <div class="card-body p-3 p-md-4 p-lg-5 text-center">

              <h5 class="text-muted small">REDEFINIR SENHA</h5>

              <!-- Logo responsiva -->
              <img src="../images/ikesaki_logo.png" class="img-fluid my-3" style="max-width: 200px;" />

              <form @submit.prevent="submit">

                <!-- EMAIL -->
                <div class="mb-3 text-start">
                  <label class="form-label">E-mail</label>
                  <input type="email" class="form-control" v-model="form.email" required />
                </div>

                <!-- CODE -->
                <div class="mb-3 text-start">
                  <label class="form-label">Código de verificação</label>
                  <input class="form-control" v-model="form.code" required />
                </div>

                <!-- NOVA SENHA -->
                <div class=" mb-3 text-start position-relative">
                  <label class="form-label">Nova senha</label>

                  <input :type="showPassword ? 'text' : 'password'" class="form-control pe-5" v-model="form.newPassword"
                    required />

                  <!-- Ícone alinhado corretamente -->
                  <button type="button"
                    class="btn position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 bg-transparent"
                    @click="showPassword = !showPassword">
                    👁️
                  </button>
                </div>

                <!-- CONFIRMAR SENHA -->
                <div class="mb-3 text-start position-relative">
                  <label class="form-label">Confirmar senha</label>

                  <input :type="showConfirm ? 'text' : 'password'" class="form-control pe-5"
                    v-model="form.confirmPassword" required />

                  <button type="button"
                    class="btn position-absolute top-50 end-0 translate-middle-y me-2 p-0 border-0 bg-transparent"
                    @click="showConfirm = !showConfirm">
                    👁️
                  </button>
                </div>

                <!-- BOTÃO -->
                <div class="d-grid">
                  <button class="btn btn-danger" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    Redefinir senha
                  </button>
                </div>

              </form>

              <!-- VOLTAR -->
              <div class="mt-3">
                <router-link to="/" class="btn btn-outline-secondary btn-sm w-100">
                  Voltar para login
                </router-link>
              </div>

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
    const response = await axios.post(
      `/api/auth/reset-password`,
      {
        Email: form.email,
        Code: form.code,
        NewPassword: form.newPassword,
        ConfirmPassword: form.confirmPassword
      }
    )

    // pega mensagem do backend
    const message = response.data?.message || 'Operação realizada com sucesso'

    await Swal.fire('Sucesso', message, 'success')

    router.push('/')

  } catch (error) {
    // tenta pegar mensagem do backend (BadRequest retorna string)
    const message =
      error.response?.data?.message || // caso venha como objeto { message }
      error.response?.data ||          // caso venha como string direta
      'Erro ao redefinir senha'

    Swal.fire('Erro', message, 'error')

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