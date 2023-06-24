<template>
  <body>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h5 class="mt-5">الاشخاص المفقودون</h5>
        </div>
      </div>
    </div>
    <div>
      <!-- <ul>
        <li v-for="item in items.data" :key="item.id">
            <h3 class="text-dark">الاسم :{{ item.name }}</h3>
        </li>
      </ul> -->
    </div>
    <div class="container">
      <input
        type="text"
        class="form-control w-50 my-4 mr-sm-4 rounded-pill"
        v-model="searchQuery"
        placeholder="ابحث عن شخص مفقود"
      />
      <div class="row">
        <div class="col-md-3" v-for="item in filteredItems" :key="item.id">
          <div class="card">
            <img :src="image + item.image" class="img-fluid image" alt="..." />
            <h3 class="text-white text-right p-2">الاسم : {{ item.name }}</h3>
            <!-- <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              @click="showDetails(item)"
            >
              المزيد عن الشخص
            </button> -->
            <button
              type="button"
              class="btn btn-info btn-block log text-white"
              data-toggle="modal"
              data-target="#exampleModal"
              @click="showDetails(item)"
            >
              المزيد عن الشخص
            </button>
            <!-- <button
              type="button"
              class="btn btn-info btn-block log text-white"
              @click="updateMissing(selectedItem.id)"
            >
              تعديل
            </button> -->
            <div
              v-if="this.user.id === item.user_id"
              class="d-flex align-items-center justify-content-around mt-1"
            >
              <router-link
                class="btn btn-info bg-info btn-block rounded-pill log w-25 text-white"
                :to="{ path: '/update-missing', query: { id: item.id } }"
                >تعديل</router-link
              >
              <button
                class="btn btn-danger bg-danger btn-block rounded-pill log w-25 text-white"
                @click="deleteMissing(item)"
              >
                حذف
              </button>
            </div>

            <div class="card-body">
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <img
                        :src="image + selectedItem.image"
                        class="img-fluid image-detail"
                        alt="..."
                      />

                      <div
                        class="mt-3 d-flex align-item-center justify-content-between"
                      >
                        <h3 class="text-dark">
                          الاسم :{{ selectedItem.name }}
                        </h3>
                        <h3 class="text-dark">
                          المحافظه :{{ selectedItem.governorate }}
                        </h3>
                      </div>
                      <div
                        class="d-flex align-item-center justify-content-between"
                      >
                        <h3 class="text-dark">
                          المدينه :{{ selectedItem.city }}
                        </h3>
                        <h3 class="text-dark">العمر :{{ selectedItem.age }}</h3>
                      </div>
                      <div
                        class="d-flex align-item-center justify-content-between"
                      >
                        <h3 class="text-dark">
                          اسم الاب :{{ selectedItem.fatherName }}
                        </h3>

                        <h3 class="text-dark">
                          الهاتف :{{ selectedItem.phone }}
                        </h3>
                      </div>
                      <div
                        class="d-flex align-item-center justify-content-between"
                      >
                        <h3 class="text-dark">
                          الرقم القومي :{{ selectedItem.nationalNumber }}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "ThePerson",
  data() {
    return {
      isOwner: false,
      user: [],
      showModal: false,
      selectedItem: {},
      items: [],
      image: "https://missing-person.online/public/images/",
      searchQuery: "",
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("https://missing-person.online/public/api/auth/user-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.id);
        this.user = response.data;
      })
      .catch(() => {});
    axios
      .get("https://missing-person.online/public/api/missing", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.items = response.data.data;
      })
      .catch(() => {});
  },
  computed: {
    filteredItems() {
      if (this.searchQuery === "") {
        return this.items; // Return all items when search query is empty
      }

      const query = this.searchQuery.toLowerCase();
      return this.items.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    ...mapActions(["redirectTo"]),
    showDetails(item) {
      console.log(this.user);
      this.selectedItem = item;
      console.log(this.selectedItem);
      this.showModal = true;
      this.fetchData();
    },
    updateMissing() {
      this.redirectTo({ val: "updateMissing" });
    },
    deleteMissing(item) {
      const token = localStorage.getItem("token");
      this.selectedItem = item;

      axios
        .delete(`https://missing-person.online/public/api/missing/${item.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.fetchData();
          // this.redirectTo({ val: "ThePerson" });
        })
        .catch((error) => {
          // Handle error
          console.error("Error deleting item", error);
          // Perform any necessary error handling
        });
    },
    fetchData() {
      const token = localStorage.getItem("token");
      axios
        .get("https://missing-person.online/public/api/missing", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.items = response.data.data;
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
body {
  background-color: #112031 !important;
}
h5 {
  position: relative !important;
  text-align: center !important;
  color: rgb(10, 104, 159) !important;
  font-size: 30px !important;
}
.card {
  background-color: #112031;
  border-radius: 10px;
  text-align-last: center;
  padding: 10px 15px;
  margin-top: 20px;
}
.card-title {
  font-family: Verdana, Geneva, Tahoma, sans-serif !important;
  font-weight: 20px !important;
  font-size: 20px !important;
  color: aliceblue;
}

.card-text {
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif\;;
}
#exampleModal > div > div > div.modal-header > button > span {
  color: black !important;
}
.modal-content {
  /* height: 70; */
  width: 600px;
  margin-top: 100px;
}
.log {
  font-size: 16px;
  font-weight: bold;
}
.btn {
  color: #fff !important;
}
.image {
  max-width: 100%;
  height: 200px !important;
  object-fit: cover;
}
.image-detail {
  height: 400px !important;
  object-fit: cover;
}
</style>
