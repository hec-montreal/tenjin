package ca.hec.tenjin.api.export.model;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class SyllabusElement {

	private Object element;
	private List<SyllabusElement> children;
	private SakaiResource resource;
	private SakaiCitation citation;
	
	public SyllabusElement(Object element) {
		this.element = element;

		this.children = new ArrayList<>();
	}

	@SuppressWarnings("unchecked")
	public <T> T call(String getterName) {
		try {
			Class<?> c = element.getClass();
			Method method = c.getMethod(getterName);

			return (T) method.invoke(element);
		} catch (Exception e) {
			return null;
		}
	}

	public String getAttribute(String name) {
		Map<String, String> attributes = call("getAttributes");

		if (attributes == null) {
			return null;
		}

		return attributes.get(name);
	}
	
	public String getAttributeListDebugInfo() {
		StringBuilder ret = new StringBuilder();
		Map<String, String> attributes = call("getAttributes");
		
		for(String key : attributes.keySet()) {
			ret.append(key + ": " + attributes.get(key) + "\n");
		}
		
		return ret.toString();
	}
	
	public int getChildrenCount() {
		return children.size();
	}
}
