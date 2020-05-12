<template>
  <div class="app-container">

    <div class="filter-container" style="margin-bottom: 5px">
      <el-input v-model="listQuery.s_id" placeholder="学生学号" style="width: 200px;" class="filter-item" />
      <el-input v-model="listQuery.s_tel" placeholder="用户电话" style="width: 200px; margin-left: 10px" class="filter-item" />
      <el-input v-model="listQuery.s_name" placeholder="姓名" style="width: 100px; margin-left: 10px" class="filter-item" />
      <el-input v-model="listQuery.s_class" placeholder="班级" style="width: 100px; margin-left: 10px" class="filter-item" />
      <el-select v-model="listQuery.s_sex" placeholder="性别" clearable style="width: 90px; margin-left: 10px" class="filter-item">
        <el-option v-for="item in sexOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select  v-model="listQuery.s_position" placeholder="职位" clearable class="filter-item" style="width: 130px;  margin-left: 10px">
        <el-option v-for="item in positionOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px; float: right" type="primary" icon="el-icon-edit" @click="">
        Add
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
<!--      s_id='8000116342', s_pwd='123456', s_name='张三', s_sex='男', s_tel='13361616161', s_position='学生', s_class='1611'-->
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="学生学号" width="245" align="center">
        <template slot-scope="scope">
          {{ scope.row.s_id }}
        </template>
      </el-table-column>
      <el-table-column label="学生密码" width="245" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.s_pwd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生性别" width="230" align="center">
        <template slot-scope="scope">
          {{ scope.row.s_sex }}
        </template>
      </el-table-column>
      <el-table-column label="学生电话" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.s_tel }}
        </template>
      </el-table-column>
      <el-table-column label="学生职位" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.s_position }}
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.s_name }}
        </template>
      </el-table-column>
      <el-table-column label="学生班级" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.s_class }}
        </template>
      </el-table-column>

      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="">
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>

<script>
import { getStudents } from '@/api/admin/user'
import Pagination from '@/components/Pagination'

export default {
  components: {Pagination},
  data() {
    return {
      list: null,
      listLoading: true,
      total:0,
      listQuery: {
        page: 1,
        limit: 20,

        s_id:'',
        s_name:'',
        s_tel:'',
        s_sex:'',
        s_class:'',
        s_position:''
      },
      sexOptions: ['男','女'],
      positionOptions:['学生','班长','团支书']
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getStudents(this.listQuery).then(response => {
        //由于request.js中有前置拦截器所以我们接受到的就是response.data 我们可以直接取其中的items
        console.log(response)
        this.list = response.pageInfo.list
        this.total = response.pageInfo.total
        console.log(this.total)
        this.listLoading = false
      })
    },
    handleFilter() {
      this.fetchData()
    }
  }
}
</script>
