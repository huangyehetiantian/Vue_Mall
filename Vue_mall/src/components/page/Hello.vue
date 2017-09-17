<template>
  <div class="pos">
     <el-row>
       <el-col :span='7' class="post_order" id="order-list" >
         <el-tabs  id="leftTabs"    v-model="activeName" >

           <el-tab-pane label="点餐" name="first" type="card"  >
             <el-table  style="width:100%;margin-top:20px" border :data="tableData" name="first"  >
               <el-table-column prop="goodsName" :data="tableDate" label="商品名称"  ></el-table-column>
               <el-table-column prop="count" label="数量"  ></el-table-column>
               <el-table-column prop="price" label="金额"  ></el-table-column>
               <el-table-column  label="操作" fixed="right" >
                 <template scope="scope">
                   <el-button type="text" size="small" @click="deleteSingleGood(scope.row)">删除</el-button>
                   <el-button type="text" size="small"  @click="addOrderList(scope.row)">增加</el-button>
                 </template>
               </el-table-column>
             </el-table>
             <div class="total_money">
               数量：{{totalCount}} 金额：{{totalMoney}}元
             </div>
             <div class="btn-box">
               <el-button type="warning" size="small">挂单</el-button>
               <el-button type="danger" size="small" @click="deleteAllGoods" >删除</el-button>
               <el-button type="success" size="small"  @click="checkout">结账</el-button>
             </div>

           </el-tab-pane>

           <el-tab-pane label="挂单" name="second">挂单</el-tab-pane>
           <el-tab-pane label="外卖" name="third">外卖</el-tab-pane>
         </el-tabs>
       </el-col >

       <el-col :span='17'>

          <div class="title">热门商品</div>
          <ul class="goods_list">
            <li v-for="item in hotGoods"  @click="addOrderList(item)" >
              <span>{{item.goodsName}}</span>
              <span class="money">￥{{item.price}}</span>
            </li>
          </ul>

         <div class="goods_type">
           <el-tabs >
             <el-tab-pane label="汉堡" >

               <div class="cookList" v-for="food in hambgerData"  @click="addOrderList(food)" >
                 <span class="foodImg"><img :src="food.goodsImg" width="100%"></span>
                 <div class="foodR">
                   <div class="foodName">{{food.goodsName}}</div>
                   <div class="foodPrice">￥{{food.price}}</div>
                 </div>
               </div>

             </el-tab-pane>
             <el-tab-pane label="小食"   >

               <div class="cookList" v-for="food in smlfoodData"  @click="addOrderList(food)" >
                 <span class="foodImg"><img :src="food.goodsImg" width="100%"></span>
                 <div class="foodR">
                   <div class="foodName">{{food.goodsName}}</div>
                   <div class="foodPrice">￥{{food.price}}</div>
                 </div>
               </div>

             </el-tab-pane>
             <el-tab-pane label="饮料"    >

               <div class="cookList" v-for="food in drinkData"  @click="addOrderList(food)" >
                 <span class="foodImg"><img :src="food.goodsImg" width="100%"></span>
                 <div class="foodR">
                   <div class="foodName">{{food.goodsName}}</div>
                   <div class="foodPrice">￥{{food.price}}</div>
                 </div>
               </div>

             </el-tab-pane>
             <el-tab-pane label="套餐"    >

               <div class="cookList" v-for="food in taocanData"  @click="addOrderList(food)" >
                 <span class="foodImg"><img :src="food.goodsImg" width="100%"></span>
                 <div class="foodR">
                   <div class="foodName">{{food.goodsName}}</div>
                   <div class="foodPrice">￥{{food.price}}</div>
                 </div>
               </div>

             </el-tab-pane>
             </el-tabs>
         </div>

       </el-col >
     </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'pos',
  data () {
    return {
      msg: 'Welcome to Your Vue.js Router',
      activeName: 'first',
      tableData: [],
      hotGoods: [],
      hambgerData: [],
      smlfoodData: [],
      drinkData: [],
      taocanData: [],
      totalCount: 0,
      totalMoney: 0
    }
  },
  mounted: function () {
    var orderHeight = document.body.clientHeight
    document.getElementById('order-list').style.height = orderHeight + 'px'
  },
  created: function () {
    axios.get('http://jspang.com/DemoApi/oftenGoods.php')
    .then(response => {
      this.hotGoods = response.data
    })
    .catch()
    axios.get('http://jspang.com/DemoApi/typeGoods.php')
    .then(response => {
      this.hambgerData = response.data[0]
      this.drinkData = response.data[2]
      this.smlfoodData = response.data[1]
      this.taocanData = response.data[3]
      console.log(this.foodData)
    })
    .catch()
  },
  methods: {
    addOrderList (goods) {
      let isHave = false
      this.totalCount = 0
      this.totalMoney = 0
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true
        }
      }
      if (isHave) {
        let arr = this.tableData.filter(o => o.goodsId === goods.goodsId)
        arr[0].count++
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        }
        this.tableData.push(newGoods)
      }
      this.getAllMoney()
    },
    deleteSingleGood (goods) {
      this.tableData = this.tableData.filter(o => o.goodsId !== goods.count)
      this.getAllMoney()
    },
    getAllMoney () {
      this.totalCount = 0
      this.totalMoney = 0
      if (this.tableData) {
        this.tableData.forEach(element => {
          this.totalCount += element.count
          this.totalMoney = this.totalMoney + (element.price * element.count)
        })
      }
    },
    deleteAllGoods () {
      this.tableData = []
      this.totalCount = 0
      this.totalMoney = 0
    },
    checkout () {
      if (this.tableData.length > 0) {
        this.tableData = []
        this.totalCount = 0
        this.totalMoney = 0
        this.$message({
          message: '结账成功，感谢你又给店里出了一份力',
          type: 'success'
        })
      } else {
        this.$message({
          message: '不能空结。老板理解你的心情',
          type: 'success'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pos{
  font-size:12px
}
.post_order{
  background:#F9FAFc;
  height:100%;
  border-right:1px solid #c0cDcA;
}
.el-table__header{
  height:300px!important;
}
.btn-box{
  margin-top:20px
}
.title{
  border-bottom:1px solid #D3dCe6;
  background:#F9FAFc;
}
.goods_list li{
  list-style:none;
  float:left;
  border:1px solid aliceblue;
  padding:5px 2px;
  margin:10px;
  background:white;
  cursor:pointer;
}
.money{
  color:#58B7ff
}
.goods_type{
  clear:both;
  margin-top:10px;
}
.cookList{
  background:white;
  float:left;
  overflow:hidden;
  text-align:center;
  margin-right:30px;
  margin-bottom:40px;
  min-width:100px;
  min-height:10px;
  padding:10px;
  box-sizing:border-box;
  cursor:pointer;
}
.cookList span{
  display:block;
  float:left;
}
.foodR{
  float:left;
  text-align:center;
  margin-left:10px;
}
.foodImg{
  width:100px;
  float:left;
}
.foodName{
  font-size:18px;
  height:100px;
  line-height:100px;
  color:brown;
}
.foodPrice{
  font-size:16px;
  margin-top:2px;
  color:#58B7ff
}
  .total_money{
    background:white;
    padding:3px;
    box-sizing:border-box;
    border-bottom:1px solid #E8E8E8;
  }
</style>
