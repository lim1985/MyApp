<template>
  <div>
    <a-modal :title="title" :width="600" v-model="Sortvisible" @ok="handleUpdataOk">
      <span>
        <h3>温馨提示：点击拖动即可完成排序。</h3>
      </span>
      <a-spin :spinning="confirmLoading">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col" style="width: 10%;">序号</th>
              <!-- <th scope="col">Id</th> -->
              <th scope="col" style="width: 25%;">姓名</th>
              <th scope="col" style="width: 50%;">职务</th>
            </tr>
          </thead>
          <vuedraggable
            :component-data="getComponentData()"
            class="wrapper"
            v-model="list"
            tag="tbody"
          >
            <tr v-for="(item,index) in list" :key="item.ID">
              <td scope="row">{{ index+1 }}</td>
              <!-- <td scope="row">{{ item.ID }}</td> -->
              <td>{{ item.UserName }}</td>
              <td>{{ item.UJOB }}</td>
            </tr>
          </vuedraggable>
        </table>
      </a-spin>
      <!-- <vuedraggable :component-data="getComponentData()" class="wrapper" v-model="list">
        <transition-group>
          <div v-for="(item,index) in list" :key="index" class="item">
            <p>{{ index }}.{{ item.UserName }}</p>
          </div>
        </transition-group>
      </vuedraggable>-->
    </a-modal>
  </div>
</template>
<script>
import vuedraggable from 'vuedraggable';
import { SortUserPhoneList } from '@/api/manage'
import { setTimeout } from 'timers';

export default {
  name: 'SortUser',
  components: { vuedraggable },
  props: {
    UserList: {
      type: Array,
      default: () => [] // es6的箭头函数
    },
  },
  data () {
    return {
      list: [],
      title: '排序',
      Sortvisible: false,
      confirmLoading: false,
      param: []
    }
  },
  updated () {

    let arr = this.list.map((item, index, arr) => {
      let _length = arr.length;
      return { ID: item.ResID, UserPhoneID: item.ID, username: item.UserName, OrderID: _length - index, DepID: item.Department_ID }
    })
    console.log(this.list);
    console.log(arr);
    this.param = arr;
  },
  create () {
    this.list = this.UserList;

  },
  methods: {
    handleChange () {

      console.log('changed');
      console.log(this.list);
    },
    inputChanged (value) {

      this.activeNames = value;
      console.log(this.activeNames);
    },
    getComponentData () {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged
        },
        attrs: {
          wrap: true
        },
        props: {
          value: this.activeNames
        }
      };
    },
    async handleUpdataOk () {
      console.log(this.param);
      this.confirmLoading = true;
      SortUserPhoneList(this.param).then(res => {
        console.log(res)
        if (res.res == 'success') {
          setTimeout(() => {
            this.$message.success('排序完成')
            this.confirmLoading = false;
            this.Sortvisible = false;
            this.$emit('ok')
          }, 1000);
        }
      })

    },
    show (val) {
      this.list = val;
      this.Sortvisible = true;
    }
  }
}
</script>>
<style scoped>
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}
table {
  border-collapse: collapse;
}
.table .thead-dark th {
  color: #fff;
  background-color: #1890ff;
  border-color: #fff;
}
.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}
.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

th {
  text-align: inherit;
}
</style>