package ca.hec.tenjin.impl.export.pdf;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import ca.hec.tenjin.api.exception.PdfExportException;
import ca.hec.tenjin.api.export.pdf.PdfSyllabusTemplateContext;

public class PdfSyllabusTemplateContextImpl implements PdfSyllabusTemplateContext {

	private Map<String, Object> values;

	public PdfSyllabusTemplateContextImpl() {
		this.values = new HashMap<>();
	}

	@Override
	public Object getValue(String name) {
		return values.get(name);
	}

	@Override
	public void setValue(String name, Object value) {
		values.put(name, value);
	}

	@Override
	public String evaluateExpression(String expression) throws PdfExportException {
		String[] comps = expression.split("\\.");
		Object root = null;

		for (String comp : comps) {
			if (root == null) {
				root = getValue(comp);
			} else {
				try {
					root = getProperty(root, comp);
				} catch (Exception e) {
					throw new PdfExportException(e);
				}
			}
		}
		
		if(root == null) {
			return "";
		}
		
		return root.toString();
	}

	private Object getProperty(Object o, String name) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		Class<?> c = o.getClass();
		Method getter = c.getMethod("get" + Character.toUpperCase(name.charAt(0)) + name.substring(1));

		return getter.invoke(o);
	}
}
