<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div @click="isCollapse = !isCollapse" style="text-align:center;">| | |</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="blue" :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavItem(subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  created:function(){
    this.getMenulist()
    this.activePath = window.sessionStorage.getItem('path')
  },
  data() {
    return {
      menulist:[],
      iconsObj:{
        '125':'iconfont icon-user',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao'
      },
      isCollapse:false,
       activePath:''

    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenulist() {
      const {data:res} = await this.$http.get('menus')
      if(res.meta.status !== 200) return this.$message.error('请求数据失败')
      this.menulist = res.data
      // console.log(this.menulist);
    },
     saveNavItem(index){
      console.log(index)
      sessionStorage.setItem('path','/'+index)
    }

  }
};
</script>
<style lang='less' scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  color: white;
  align-items: center;
  padding-left: 0;
  >div {
    display: flex;
    align-items: center;
    >span{
      margin-left: 15px;
    }
  }

}
.el-aside {
  background:rgb(51,55,68);
}
.el-main {
  background:rgb(234,237,241);
}
.el-menu {
  border-right: none;
}
.iconfont {
  margin-right: 10px;
}
</style>