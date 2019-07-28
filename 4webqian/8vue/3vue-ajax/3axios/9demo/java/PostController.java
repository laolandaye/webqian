@Controller
@RequestMapping("/post")
public class PostController {

	// 1.URL + 无参数
	@RequestMapping(value = "/xxx", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Map<String,Object>> queryCarNos() {
		return null;
	}

	//2.url 地址
	@RequestMapping(value = "/emp/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public String deleteEmployee(@PathVariable("id") Integer id){ }

	//3.URL + 字符串参数： @RequestParam（字段），map，对象
	@RequestMapping(value = "/xxxs/condition", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Map<String,Object>>  queryCarNosByStation(@RequestParam(name = "station", defaultValue = "", required = false) String station ) { }

	@RequestMapping(value = "/xxxs/condition", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public Object queryCarNosByStation(Map<String, Object> map) { }

	@RequestMapping(value = "/xxxs/condition", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public Object queryCarNosByStation(XxxDo xxxDo) { }

	@PostMapping("/brand")
    public ResponseEntity<Void> saveBrand(Brand brand, @RequestParam("cids") List<Long> cids){
        this.brandService.saveBrand(brand, cids);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

	//4.URL + 对象｛｝： @RequestBody map，@RequestBody 对象
	@RequestMapping(value = "/xxxs", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public Object toGetStationNumDayOrMonth(@RequestBody Map<String, Object> map) { }

	@RequestMapping(value = "/xxxs", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public Object toGetStationNumDayOrMonth(@RequestBody XxxDo xxxDo) { }
}
