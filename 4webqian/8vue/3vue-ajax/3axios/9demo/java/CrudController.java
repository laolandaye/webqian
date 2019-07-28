@Controller
public class CrudController {

	//查询所有员工返回列表页面
	@GetMapping("/emps")
	public String  list(Model model){}

	//来到员工添加页面
	@GetMapping("/emp")
	public String toAddPage(Model model){ }

	//员工添加
	//SpringMVC自动将请求参数和入参对象的属性进行一一绑定；要求请求参数的名字和javaBean入参的对象里面的属性名是一样的
	@PostMapping("/emp")
	public String addEmp(Employee employee){ }

	//来到修改页面，查出当前员工，在页面回显
	@GetMapping("/emp/{id}")
	public String toEditPage(@PathVariable("id") Integer id,Model model){ }

	//员工修改；需要提交员工id；
	@PutMapping("/emp")
	public String updateEmployee(Employee employee){ }

	//员工删除
	@DeleteMapping("/emp/{id}")
	public String deleteEmployee(@PathVariable("id") Integer id){ }



}

