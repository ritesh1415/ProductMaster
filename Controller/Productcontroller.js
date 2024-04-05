import connection from "../Server.js"
const getproduct=async(req,res)=>{
    try {
      const data=await connection.promise().query("SELECT * FROM product");
      if(!data){
        return res.status(404).send({
            success:false,
            message:'no record found',
        })
      } 
      res.status(200).send({
        success:true,
        message:'All product data',
        totalProduct:data[0].length,
        data:data[0]
      }); 
    } catch (error) {
       console.log(error);
       res.status(500).send({
        success:false,
        message:'error in get products api',
        error
       }) 
    }
}
const getsingle=async(req,res)=>{
    try {
    const productid=req.params.id
    if(!productid){
        return res.status(404).send({
            success:false,
            message:'invalid product id'
        })
    }    
    const data=await connection.promise().query('SELECT * FROM product WHERE Productid=?',[productid])
    if(!data){
        return res.status(404).send({
            success:false,
            message:'no records'
        })
    }
    res.status(200).send({
        success:true,
        productDetails:data[0]
    })
    } catch (error) {
       console.log(error)
       res.status(404).send({
        success:false,
     message:'error in getsingle product api'
        
       }) 
    }
}

const createproduct = async(req, res) => {
    try {
    
        const { Productid ,Productname, Categoryname } = req.body;

        if (!Productid || !Productname || !Categoryname) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both Productname and Categoryname in the request body.'
            });
        }

        const data = await connection.promise().query('INSERT INTO product (Productid,Productname, Categoryname) VALUES (?, ?,?)', [Productid,Productname, Categoryname]);

        if (!data) {
            return res.status(500).json({
                success: false,
                message: 'Error in insert API.'
            });
        }

        res.status(201).json({
            success: true,
            message: 'New record created successfully.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in createproduct API.',
            error: error.message 
        });
    }
}

const deleteproduct = async (req, res) => {
    try {
        const productid = req.params.id;
        if (!productid) {
            return res.status(400).json({
                success: false,
                message: 'Please provide the product ID to delete.'
            });
        }

        const data = await connection.promise().query('DELETE FROM product WHERE Productid = ?', [productid]);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in deleteproduct API.',
            error: error.message
        });
    }
}


const updateproduct = async (req, res) => {
    try {
        const { Productid, Productname, Categoryname } = req.body;

        if (!Productid || !Productname || !Categoryname) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both Productname and Categoryname in the request body.'
            });
        }

        const [data] = await connection.promise().query('UPDATE product SET Productname = ?, Categoryname = ? WHERE Productid = ?', [Productname, Categoryname, Productid]);

        if (data.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found or no changes were made.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in updateproduct API.',
            error: error.message
        });
    }
}

export {getproduct,getsingle,createproduct,deleteproduct,updateproduct}