<template>
  <div class="min-vh-100 d-flex align-items-center bg-dark bg-gradient">
    <div class="container">
      <div class="row justify-content-center">

        <!-- Grid responsivo -->
        <div class="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

          <div class="card shadow-lg border-0 bg-white">
            <div class="card-body p-3 p-md-4 p-lg-5 text-center">

              <h5 class="text-muted small">RECUPERAR SENHA</h5>

              <!-- Logo responsiva -->
              <img
                src="../images/ikesaki_logo.png"
                class="img-fluid my-3"
                style="max-width: 200px;"
              />

              <form @submit.prevent="submit">

                <div class="mb-3 text-start">
                  <label class="form-label">E-mail</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="email"
                    required
                  />
                </div>

                <div class="d-grid">
                  <button
                    class="btn btn-danger"
                    :disabled="loading"
                  >
                    <span
                      v-if="loading"
                      class="spinner-border spinner-border-sm me-2"
                    ></span>
                    Enviar código
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
  import { ref } from 'vue'
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const email = ref('')
  const loading = ref(false)
  
  const submit = async () => {
    loading.value = true
  
    try {
      await axios.post(`/api/auth/forgot-password`, {
        email: email.value
      })
  
      await Swal.fire('Sucesso', `Código enviado para e-mail ${email.value}`, 'success')
  
      router.push('/reset-password')
  
    } catch (error) {
      Swal.fire('Erro', 'Erro ao enviar código', 'error')
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .bg-gradient {
    background: linear-gradient(135deg, #422727, #2a5298);
  }
  </style>