@Controller
@RequestMapping("/get")
public class PostController {

	// 1.URL + 无参数
	@RequestMapping(value = "/url", method = RequestMethod.Get, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String,Object>> queryCarNos() { }

	// 2.restful  oid
	@GetMapping("/emp/{id}")
	public String toEditPage(@PathVariable("id") Integer id,Model model){ }

	// 3.URL + 字符串参数?&: @RequestParam（字段），map，对象
	@RequestMapping(value = "/urlStr1", method = RequestMethod.Get, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String,Object>>  queryCarNosByStation(
			@RequestParam(name = "station", defaultValue = "", required = false) String station) {	}

	@RequestMapping(value = "/urlStr1", method = RequestMethod.Get, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String,Object>>  queryCarNosByStation(Map<String, Object> map) {	}

	@RequestMapping(value = "/urlStr1", method = RequestMethod.Get, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String,Object>>  queryCarNosByStation(XxxDo xxxDo) {	}
}
